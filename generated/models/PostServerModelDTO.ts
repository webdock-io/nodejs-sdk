/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Post Server model
 */
export type PostServerModelDTO = {
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
     * Virtualization type for your new server. container means the server will be a Webdock LXD VPS and kvm means it will be a KVM Virtual machine. If you specify a snapshotId in the request, the server type from which the snapshot belongs much match the virtualization selected. Reason being that KVM images are incompatible with LXD images and vice-versa.
     */
    virtualization?: PostServerModelDTO.virtualization;
    /**
     * Slug of the server image. Get this from the /images endpoint. You must pass either this parameter or snapshotId
     */
    imageSlug?: string;
    /**
     * SnapshotID from which to create the server. Get this from the /servers/{serverSlug}/snapshots endpoint. You must pass either this parameter or imageSlug.
     */
    snapshotId?: number;
};

export namespace PostServerModelDTO {

    /**
     * Virtualization type for your new server. container means the server will be a Webdock LXD VPS and kvm means it will be a KVM Virtual machine. If you specify a snapshotId in the request, the server type from which the snapshot belongs much match the virtualization selected. Reason being that KVM images are incompatible with LXD images and vice-versa.
     */
    export enum virtualization {
        CONTAINER = 'container',
        KVM = 'kvm',
    }


}

