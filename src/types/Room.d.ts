export type RoomType = {
    roomName:       string,
    author:         string,
    users?:         string[],
    privateRoom:    boolean,
    maxUsers:       number
};