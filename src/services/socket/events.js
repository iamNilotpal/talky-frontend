export const SOCKET_EVENTS = {
  JOIN: 'join',
  LEAVE: 'leave',
  ADD_PEER: 'add_peer',
  SESSION_DESCRIPTION: 'session_description', // FROM CLIENT
  ICE_CANDIDATE: 'ice_candidate', // FROM CLIENT
  RELAY_ICE: 'handle_ice', // FROM SERVER
  RELAY_SDP: 'handle_sdp', // FROM SERVER
  REMOVE_PEER: 'remove_peer',
};
