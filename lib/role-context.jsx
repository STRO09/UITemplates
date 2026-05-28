'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

/**
 * Available application user roles.
 */
export const USER_ROLES = {
  GOVERNMENT: 'government',
  COMPANY: 'company',
};

/**
 * Context shape for role management.
 */
const RoleContext = createContext(undefined);

/**
 * Role provider.
 *
 * Stores the currently selected user role
 * globally across the application.
 *
 * USE CASES:
 * - conditional dashboards
 * - protected UI sections
 * - role-based rendering
 * - onboarding flows
 */
export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);

  /**
   * Memoize context value to prevent
   * unnecessary rerenders.
   */
  const value = useMemo(
    () => ({
      role,
      setRole,
      isGovernment:
        role === USER_ROLES.GOVERNMENT,
      isCompany:
        role === USER_ROLES.COMPANY,
      clearRole: () => setRole(null),
    }),
    [role]
  );

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

/**
 * Role context hook.
 *
 * Provides access to:
 * - current role
 * - role setters
 * - role helper booleans
 */
export function useRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error(
      'useRole must be used within RoleProvider'
    );
  }

  return context;
}