import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup,GoogleAuthProvider, createUserWithEmailAndPassword}  from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYieaHgc01wYxt8D8fJxezgJWCq-mcvi0",
    authDomain: "crwn-clothing-db-d8440.firebaseapp.com",
    projectId: "crwn-clothing-db-d8440",
    storageBucket: "crwn-clothing-db-d8440.appspot.com",
    messagingSenderId: "824238408151",
    appId: "1:824238408151:web:9f04a93614797276eacb92"
  };
  

  const firebaseApp = initializeApp(firebaseConfig);

  //there multiple providers available, this one is from google, you need to instantiante them. 
  //for example there should be a github provider or facebook provider if you want to sign in with those
  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signINWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

  export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
  
  if(!userAuth) return;

  const userDocRef = doc(db, 'user', userAuth.uid);  

  const userSnapshot = await getDoc(userDocRef); // get the data out of the specified doc
  console.log(userSnapshot.exists())// the method exists check if the data exists in the specified document.

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    
    try {
      await setDoc(userDocRef,{displayName, email, createdAt, ...additionalInformation});
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    
  if(!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password);
  
}