/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */


/**
 * Event hook model
 */
export interface CreateEventHookModelDTO {
    /**
     * Callback URL
     */
    callbackUrl: string;
    /**
     * (Optional) Callback ID
     */
    callbackId?: string | null;
    /**
     * (Optional) Event Type
     */
    eventType?: CreateEventHookModelDTO.eventType | null;
}

export namespace CreateEventHookModelDTO {

    /**
     * (Optional) Event Type
     */
    export enum eventType {
        PROVISION = 'provision',
        RESTORE_SERVER = 'restore-server',
        CHANGE_PROFILE = 'change-profile',
        SET_STATE = 'set-state',
        DELETE = 'delete',
        BACKUP = 'backup',
        SET_HOSTNAMES = 'set-hostnames',
        UPDATE_WEBROOT = 'update-webroot',
        SETUP_SSL = 'setup-ssl',
        INSTALL_WORDPRESS = 'install-wordpress',
        MANAGE_WORDPRESS = 'manage-wordpress',
        MANAGE_SHELLUSER = 'manage-shelluser',
        MANAGE_KEYS = 'manage-keys',
        TOGGLE_PASSWORDAUTH = 'toggle-passwordauth',
        MANAGE_MYSQL = 'manage-mysql',
        MANAGE_DBUSER = 'manage-dbuser',
        MANAGE_FTPUSER = 'manage-ftpuser',
        SET_PHP_SETTINGS = 'set-php-settings',
        CRONJOB = 'cronjob',
        PULL_FILE = 'pull-file',
        PUSH_FILE = 'push-file',
        DELETE_FILE = 'delete-file',
        EXECUTE_FILE = 'execute-file',
    }


}
