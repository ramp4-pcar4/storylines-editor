import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useLockStore = defineStore('lock', {
    state: () => ({
        socket: undefined as WebSocket | undefined,
        uuid: '',
        secret: '',
        clientId: '',
        connected: false,
        received: false,
        timeInterval: undefined as NodeJS.Timeout | undefined,
        timeRemaining: 100000000000000, // in seconds
        broadcast: undefined as BroadcastChannel | undefined,
        confirmationTimeout: undefined as NodeJS.Timeout | undefined, // the timer to show the session extension confirmation modal
        endTimeout: undefined as NodeJS.Timeout | undefined // the timer to kill the session due to timeout
    }),
    actions: {
        // Opens a connection with the web socket
        initConnection() {
            console.log('lockStore - initConnection');
            return new Promise<void>((resolve) => {
                const socketUrl = `${
                    import.meta.env.VITE_APP_CURR_ENV ? import.meta.env.VITE_APP_API_URL : 'http://localhost:6040'
                }`;
                this.socket = new WebSocket(socketUrl);

                // Connection opened
                this.socket.onopen = () => {
                    this.connected = true;
                    this.clientId = uuidv4();
                    resolve();
                };

                this.socket.onerror = () => {
                    console.log('Socket connection errored!');
                };

                // Spam the server with nonsense messages every 30 seconds to prevent firefox from nuking the connection.
                const msgSpam = setInterval(() => {
                    this.socket?.send(JSON.stringify({ status: 'nonsense' }));
                }, 30000);

                // Close the socket connection before the user closes the window.
                window.addEventListener('beforeunload', () => {
                    clearInterval(msgSpam);
                    this.socket?.close();
                });
            });
        },
        // Attempts to lock a storyline for this user.
        // Returns a promise that resolves if the lock was successfully fetched and rejects if it was not.
        async lockStoryline(uuid: string): Promise<void> {
            console.log('lockStore - lockStoryline');
            console.log(this);
            console.log(this.$state);
            // Stop the previous storyline's timer
            clearInterval(this.timeInterval);

            // If not connected or socket isn't open, try to connect first
            if (!this.connected || !this.socket || this.socket.readyState !== WebSocket.OPEN) {
                await this.initConnection();
            }

            return new Promise((resolve, reject) => {
                this.received = false;
                this.socket?.send(JSON.stringify({ uuid, lock: true, clientId: this.clientId }));

                const handleMessage = (event: MessageEvent) => {
                    const data = JSON.parse(event.data);

                    if (!data || data.status === 'nonsense' || data.clientId !== this.clientId) {
                        return;
                    }

                    if (data.status === 'fail') {
                        this.socket!.removeEventListener('message', handleMessage);
                        reject(new Error(data.message || 'Failed to lock storyline.'));
                    } else if (data.status === 'success') {
                        this.socket!.removeEventListener('message', handleMessage);

                        this.uuid = uuid;
                        this.secret = data.secret;
                        this.broadcast = new BroadcastChannel(data.secret);
                        console.log('lockStore - name of BC');
                        console.log(data.secret);
                        resolve();
                    }
                };

                this.socket!.addEventListener('message', handleMessage);
            });
        },
        // Unlocks the curent storyline for this user. Only to be called on session end.
        unlockStoryline() {
            clearInterval(this.timeInterval);
            if (this.connected) {
                this.socket!.send(JSON.stringify({ uuid: this.uuid, lock: false, clientId: this.clientId }));
                this.uuid = '';
                this.secret = '';
                this.broadcast?.postMessage({ action: 'end' });
            }
        },
        // Resets the current session back to a full 30 minutes.
        resetSession(overrideTime?: number) {
            console.log('lockStore - resetSession');
            this.timeRemaining =
                overrideTime !== undefined
                    ? overrideTime
                    : import.meta.env.VITE_APP_CURR_ENV
                    ? Number(import.meta.env.VITE_SESSION_END) * 60
                    : 1800; //  This value is in seconds!!! Don't mix up the units!!!
            clearInterval(this.timeInterval);
            // Update the time remaining every second.
            this.timeInterval = setInterval(() => {
                if (this.timeRemaining === 0) {
                    clearInterval(this.timeInterval);
                } else {
                    this.timeRemaining -= 1;
                }
            }, 1000);
        }
    }
});
