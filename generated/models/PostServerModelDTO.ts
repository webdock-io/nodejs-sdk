/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Post Server model
 */
export interface PostServerModelDTO {
    /**
     * Name of the server
     */
    name: string;
    /**
     * Suggested Slug (shortname) of the server. Up to 12 alphanumeric chars. This slug is effectively your server ID and anything submitted in this field is merely your suggestion for a slug. If omitted or the suggested slug is already taken, the system will automatically generate an appropriate unique slug based on your server Name or suggestion. Always check the return from this method to determine the actual slug your server ended up receiving.
     */
    slug?: string;
    /**
     * ID of the location. Get this from the /locations endpoint.
     */
    locationId: string;
    /**
     * Slug of the server profile. Get this from the /profiles endpoint.
     */
    profileSlug: string;
    /**
     * Slug of the server image. Get this from the /images endpoint.
     */
    imageSlug: string;
    /**
     * SnapshotID from which to create the serve. Get this from the /servers/{serverSlug}/snapshots endpoint.
     */
    snapshotId?: string;
}
