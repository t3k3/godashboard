'use client';

import React, { createContext, useContext, useState } from 'react';

const AdminTokenContext = createContext();

export function AdminTokenProvider({ children }) {
  const [adminToken, setAdminToken] = useState('');

  return (
    <AdminTokenContext.Provider value={{ adminToken, setAdminToken }}>
      {children}
    </AdminTokenContext.Provider>
  );
}

export function useAdminToken() {
  return useContext(AdminTokenContext);
}
