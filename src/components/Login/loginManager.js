import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const initializeLoginFramework = () => {
  initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, googleProvider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      };
      setUser(signedInUser);
      console.log(displayName, email, photoURL);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};


export const handleFbSignIn = () => {
  const fbProvider = new FacebookAuthProvider();
  const auth = getAuth();
signInWithPopup(auth, fbProvider)
.then((result) => {
  // The signed-in user info.
  const user = result.user;
  console.log('fb user after sign in ', user);

  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  const credential = FacebookAuthProvider.credentialFromResult(result);
  const accessToken = credential.accessToken;

  // ...
})
.catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.email;
  // The AuthCredential type that was used.
  const credential = FacebookAuthProvider.credentialFromError(error);

  // ...
});

}

const handleSignOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        error: "",
        success: false,
      };
      setUser(signedOutUser);
      console.log(res);
    })
    .catch((err) => {});
};

export const createUserWithEmailAndPassword = () => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
}


export const signInWithEmailAndPassword = () => {
  const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          navigate(from);
          console.log("sign in user info", res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
}


const updateUserName = (name) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, { displayName: name })
    .then(() => {
      console.log("user name updated successfully");
    })

    .catch((error) => {
      console.log(error);
    });
};
