import { firestore, auth } from '../auth/firebase';
import { collection, where, addDoc, query, orderBy, limit, serverTimestamp, doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { createDeflate } from 'zlib';

export async function sendAlert(employer:boolean, id:string, info: string, createdAt:any) {
  let userId = (!employer ? 'employer'+id : 'nurse'+id)
  const alertRef = collection(firestore, 'alert')
  const docRef = doc(alertRef, userId)
  let infoField = collection(docRef, 'info')

  const checkAndCreateDocument = async () => {
    try {
      // Check if the document exists in Firestore
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        // If the document does not exist, create a new document
        await setDoc(docRef, {
          status:true
         });
        console.log('New document created successfully!');
      }
    } catch (error) {
      console.error('Error checking/creating document:', error);
    }
  };
  await checkAndCreateDocument()

  await addDoc(infoField, {
    info: info,
    createdAt: createdAt
  });

  updateDoc(docRef, {
    status:false
  })
}
