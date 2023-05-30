import { Delete, Get, Post } from '@nestjs/common';

const realm = ':realm';
const namespaceConfigIds = `${realm}/configs`;
const files = 'files/config.json';

export const GetPagination = () => Get('pagination');
export const PostFile = () => Post(files);
export const DownloadFile = () => Get(files);
export const PostPassThroughPubSub = () => Post();
export const PostRealm = () => Post(realm);
export const GetRealm = () => Get(realm);
export const DeleteRealm = () => Delete(realm);
export const DeleteConfigIds = () => Delete(namespaceConfigIds);
