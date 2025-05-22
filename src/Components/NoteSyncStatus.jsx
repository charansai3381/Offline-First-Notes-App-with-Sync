import React from "react";

const NoteSyncStatus = ({ synced }) => {
  return (
    <span className={`sync-status ${synced ? "synced" : "unsynced"}`}>
      {synced ? "Synced" : "Unsynced"}
    </span>
  );
};

export default NoteSyncStatus;
