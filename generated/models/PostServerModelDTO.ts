/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */


/**
 * Post Server model
 */
export interface PostServerModelDTO {
    /**
     * Name of the server
     */
    name?: string;
    /**
     * Slug of the server
     */
    slug?: string;
    /**
     * ID of the location
     */
    locationId?: string;
    /**
     * Slug of the server profile
     */
    profileSlug?: string;
    /**
     * Slug of the server image
     */
    imageSlug?: string;
    /**
     * SnapshotID from which to create the server
     */
    snapshotId?: string | null;
}
