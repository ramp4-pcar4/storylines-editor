/*****************************************************************************
 * ddr_registry.js
 * 2017 DDR Team
 * nrcan.ddradmin.rncan@canada.ca
 *
 *****************************************************************************/

/**
 * DDR Registry Library
 * @author DDR Team
 * @this DDRRegistry
 * @return {DDRRegistry} DDR Registry connection object
 */
class DDRRegistry{
  /**
   * Create a DDR Registry connection object
   * @param {String} username - The user name
   * @param {String} password - The user password
   * @param {String} server_url - DDR Registry Server domain name
   */
    constructor(username, password, server_url){
        this.username = username;
        this.password = password;
        this.server_url = server_url;
    }

    /**
     * Perform a GET request to the DDR Registry
     * @param {String} tableToQuery - The DDR Registry table name
     * @param {Function} callback - Callback function accepting json response
     * @param {String} filter - Filter to apply to DDR Registry table records
     */
    getRecord(tableToQuery, callback, filter){
        var filterToApply = '/Filter?' + filter;
        if (filter){
            this.ajax(this.username, this.password, 'GET', this.server_url + '/fmedatastreaming/DDR_Registry_API/' + tableToQuery + '.fmw' + filterToApply, callback);
        }
        else {
            this.ajax(this.username, this.password, 'GET', this.server_url + '/fmedatastreaming/DDR_Registry_API/' + tableToQuery + '.fmw', callback);
        }
    }

    /**
     * Perform a PUT (update) request to a DDR Registry table record
     * @param {String} tableToQuery - The DDR Registry table name
     * @param {Function} callback - Callback function accepting json response
     * @param {String} tableKey - Table record primary key value (UUID)
     * @param {String} data - The Table record content in json "stringified" format
     */
    putRecord(tableToQuery, callback, tableKey, data){

        this.ajax(this.username, this.password, 'PUT', this.server_url + '/fmedatastreaming/DDR_Registry_API/' + tableToQuery + '.fmw/Record/' + tableKey, callback, data);
    }

    /**
     * Perform a POST (insert) request to a DDR Registry table
     * @param {String} tableToQuery - The DDR Registry table name
     * @param {Function} callback - Callback function accepting json response
     * @param {String} data - The Table record content in json "stringified" format
     */
    postRecord(tableToQuery, callback, data){

        this.ajax(this.username, this.password, 'POST', this.server_url + '/fmedatastreaming/DDR_Registry_API/' + tableToQuery + '.fmw', callback, data);
    }

    /**
     * Perform a DELETE request to a DDR Registry table record
     * @param {String} tableToQuery - The DDR Registry table name
     * @param {Function} callback - Callback function accepting json response
     * @param {String} tableKey - Table record primary key value (UUID)
     */
    deleteRecord(tableToQuery, callback, tableKey){

        this.ajax(this.username, this.password, 'DELETE', this.server_url + '/fmedatastreaming/DDR_Registry_API/' + tableToQuery + '.fmw/Record/' + tableKey, callback);
    }

    /**
     * ajax Method
     * @param {String} username - The user name
     * @param {String} password - The user password
     * @param {String} reqtype - Type of request (GET, POST, PUT or DELETE)
     * @param {String} url - The request URL
     * @param {Function} callback - Callback function accepting json response
     * @param {String} data - The Table record content in json "stringified" format
     */
    ajax(username, password, reqtype, url, callback, data) {
        $.ajax({
                type : reqtype,
                url : url,
                beforeSend : function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
                },
                contentType : "application/json",
                data : data,
                success: function(json){
                    callback(json);
                },
                timeout : 50000
        });
    }
}
