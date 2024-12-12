import { defineStore } from 'pinia';

export const useLockStore = defineStore('lock', {
    state: () => ({
        socket: undefined as WebSocket | undefined,
        uuid: '',
        secret: '',
        connected: false,
        received: false,
        timeInterval: undefined as NodeJS.Timeout | undefined,
        timeRemaining: 100000000000000, // in seconds
        result: {} as any,
        broadcast: undefined as BroadcastChannel | undefined
    }),
    actions: {
        // Opens a connection with the web socket
        initConnection() {
            const socketUrl = `${
                import.meta.env.VITE_APP_CURR_ENV ? import.meta.env.VITE_APP_API_URL : 'http://localhost:6040'
            }`;
            this.socket = new WebSocket(socketUrl);

            // Connection opened
            this.socket.onopen = () => {
                this.connected = true;
                return false;
            };

            // Listen for messages
            this.socket.onmessage = (event) => {
                const res = JSON.parse(event.data);
                this.received = true;
                this.result = res;
            };
        },
        // Attempts to lock a storyline for this user.
        // Returns a promise that resolves if the lock was successfully fetched and rejects if it was not.
        lockStoryline(uuid: string): Promise<void> {
            // Stop the previous storyline's timer.
            clearInterval(this.timeInterval);
            return new Promise((resolve, reject) => {
                // First we need to keep polling for the connection to be established.
                // Is there a better way to do this? :(
                const connectionPoll = setInterval(() => {
                    if (this.connected) {
                        // Now that we are connected, we need to poll for the message to be received back from the
                        // web socket server.
                        clearInterval(connectionPoll);
                        this.received = false;
                        this.socket?.send(JSON.stringify({ uuid, lock: true }));
                        const receiptPoll = setInterval(() => {
                            if (this.received) {
                                clearInterval(receiptPoll);
                                if (this.result.status === 'fail') {
                                    reject();
                                } else {
                                    this.uuid = uuid;
                                    this.secret = this.result.secret;
                                    this.broadcast = new BroadcastChannel(this.result.secret);
                                    resolve();
                                }
                            }
                        });
                    }
                }, 100);
            });
        },
        // Unlocks the curent storyline for this user. Only to be called on session end.
        unlockStoryline() {
            clearInterval(this.timeInterval);
            if (this.connected) {
                this.socket!.send(JSON.stringify({ uuid: this.uuid, lock: false }));
                this.uuid = '';
                this.secret = '';
                this.broadcast?.postMessage({ action: 'end' });
            }
        },
        // Resets the current session back to a full 30 minutes.
        resetSession(overrideTime?: number) {
            this.timeRemaining =
                overrideTime !== undefined
                    ? overrideTime
                    : import.meta.env.VITE_APP_CURR_ENV
                    ? Number(import.meta.env.VITE_SESSION_END) * 60
                    : 1800; //  This value is in seconds!!! Don't mix up the units!!!
            if (this.timeInterval) {
                clearInterval(this.timeInterval);
            }
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
