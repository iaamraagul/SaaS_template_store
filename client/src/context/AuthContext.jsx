import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { authApi, getApiError, templateApi } from "../services/api";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("saas_user", null);
  const [favoriteIds, setFavoriteIds] = useLocalStorage(
    "saas_favorite_ids",
    [],
  );
  const token = localStorage.getItem("saas_token");

  const saveSession = useCallback(
    (session) => {
      localStorage.setItem("saas_token", session.token);
      setUser(session.user);
    },
    [setUser],
  );

  const signIn = useCallback(
    async (credentials) => {
      try {
        const session = await authApi.login(credentials);
        saveSession(session);
        return session.user;
      } catch (error) {
        throw new Error(getApiError(error));
      }
    },
    [saveSession],
  );

  const signUp = useCallback(
    async (details) => {
      try {
        const session = await authApi.register(details);
        saveSession(session);
        return session.user;
      } catch (error) {
        throw new Error(getApiError(error));
      }
    },
    [saveSession],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("saas_token");
    setUser(null);
    setFavoriteIds([]);
  }, [setFavoriteIds, setUser]);

  const refreshFavorites = useCallback(async () => {
    if (!localStorage.getItem("saas_token")) return;

    try {
      const favorites = await templateApi.listFavorites();
      setFavoriteIds(favorites.map((template) => template.id));
    } catch (error) {
      if (error.response?.status === 401) signOut();
    }
  }, [setFavoriteIds, signOut]);

  useEffect(() => {
    if (user && token) refreshFavorites();
  }, [refreshFavorites, token, user]);

  const toggleFavorite = useCallback(
    async (templateId) => {
      if (!user) throw new Error("Please sign in to save favorites.");

      const alreadySaved = favoriteIds.includes(templateId);

      try {
        if (alreadySaved) {
          await templateApi.removeFavorite(templateId);
          setFavoriteIds((ids) => ids.filter((id) => id !== templateId));
        } else {
          await templateApi.addFavorite(templateId);
          setFavoriteIds((ids) => [...ids, templateId]);
        }
      } catch (error) {
        throw new Error(getApiError(error));
      }
    },
    [favoriteIds, setFavoriteIds, user],
  );

  const value = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      signOut,
      isAuthenticated: Boolean(user && token),
      favoriteIds,
      toggleFavorite,
    }),
    [favoriteIds, signIn, signOut, signUp, toggleFavorite, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
