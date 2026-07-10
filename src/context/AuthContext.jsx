import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { auth } from '@/config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          role: firebaseUser.email?.endsWith('@zinduamarket.com') ? 'admin' : 'user',
        };
        dispatch({ type: 'LOGIN', payload: userData });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
  };

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // 🚀 New: Google OAuth Handshake Function
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ 
      user: state.user, 
      isAdmin: state.user?.role === 'admin', 
      isAuthenticated: !!state.user, 
      login, 
      register, 
      loginWithGoogle, // Exported here
      logout 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
// import { createContext, useContext, useReducer } from 'react';

// // 1. Define the initial state and an initializer function for lazy loading
// const initialState = {
//   user: null,
// };

// const initializer = (initial) => {
//   try {
//     const storedUser = localStorage.getItem('auth_user');
//     const storedToken = localStorage.getItem('auth_token');

//     if (storedUser && storedToken) {
//       return { user: JSON.parse(storedUser) };
//     }
//   } catch (error) {
//     console.error("Failed to parse initialized auth session:", error);
//     localStorage.removeItem('auth_user');
//     localStorage.removeItem('auth_token');
//   }
//   return initial;
// };

// // 2. Define the reducer function
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//     case 'REGISTER':
//       return {
//         ...state,
//         user: action.payload,
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// const AuthContext = createContext(undefined);

// export const AuthProvider = ({ children }) => {
//   // 3. Initialize useReducer with the initializer function
//   const [state, dispatch] = useReducer(authReducer, initialState, initializer);

//   // Helper selectors
//   const isAuthenticated = !!state.user;
//   const isAdmin = state.user?.role === 'admin';

//   // Handle Login
//   const login = (token, userData) => {
//     localStorage.setItem('auth_token', token);
//     localStorage.setItem('auth_user', JSON.stringify(userData));
//     dispatch({ type: 'LOGIN', payload: userData });
//   };

//   // Handle Registration
//   const register = (token, userData) => {
//     localStorage.setItem('auth_token', token);
//     localStorage.setItem('auth_user', JSON.stringify(userData));
//     dispatch({ type: 'REGISTER', payload: userData });
//   };

//   // Handle Logout
//   const logout = () => {
//     localStorage.removeItem('auth_token');
//     localStorage.removeItem('auth_user');
//     dispatch({ type: 'LOGOUT' });
//   };

//   return (
//     <AuthContext.Provider value={{ user: state.user, isAdmin, isAuthenticated, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext(undefined);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     try {
//       const storedUser = localStorage.getItem('auth_user');
//       const storedToken = localStorage.getItem('auth_token');
      
//       if (storedUser && storedToken) {
//         return JSON.parse(storedUser);
//       }
//     } catch (error) {
//       console.error("Failed to parse initialized auth session:", error);
//       localStorage.removeItem('auth_user');
//       localStorage.removeItem('auth_token');
//     }
//     return null;
//   });

//   const isAuthenticated = !!user;

//   // Handle Login
//   const login = (token, userData) => {
//     localStorage.setItem('auth_token', token);
//     localStorage.setItem('auth_user', JSON.stringify(userData));
//     setUser();
//   };

//   // Handle Registration
//   const register = (token, userData) => {
//     localStorage.setItem('auth_token', token);
//     localStorage.setItem('auth_user', JSON.stringify(userData));
//     setUser(userData);
//   };

//   // Handle Logout
//   const logout = () => {
//     localStorage.removeItem('auth_token');
//     localStorage.removeItem('auth_user');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };