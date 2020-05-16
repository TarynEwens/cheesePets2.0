import firebaseConfig from "./config";

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  getUserProfile({userId, onSnapshot}) {
    return this.db.collection('publicProfiles')
    .where('userId', '==', userId)
    .limit(1)
    .onSnapshot(onSnapshot);
  }

  subscribeToPetData({username, onSnapshot}) {
    return this.db.collection('pets')
    .where('username', '==', username)
    .onSnapshot(onSnapshot);
  }

  async adoptPet({species, name}) {
    const adoptPetCallable = this.functions.httpsCallable('adoptPet');
    return adoptPetCallable({
      species,
      name
    });
  }

  async updatePet({id, hunger, happiness, energy, fun}) {
    const updatePetCallable = this.functions.httpsCallable('updatePet');
    return updatePetCallable({
      id,
      hunger,
      happiness,
      energy,
      fun,
    });
  }

  async register({email, password, username}) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    const createProfileCallable = this.functions.httpsCallable('createPublicProfile');
    return createProfileCallable({
      username
    })
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
