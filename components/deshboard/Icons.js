import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import useStates from "../../context/hooks/useStates";
import { firebase } from "../../services/firebase";

const Icons = () => {
  const [loading, setLoading] = useState(false);
  const logoInput = useRef(null);
  const favIconInput = useRef(null);
  const { storage, db } = firebase();
  const states = useStates();
  const [icons, setIcons] = useState({
    facebook: "",
    youtube: "",
    linkedIn: "",
  });

  function handleIcons(e) {
    const name = e.target.name;
    setIcons((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  }
  async function submitIcons(e) {
    e.preventDefault();
    console.log(icons);
  }

  function saveImages(name, e) {
    setLoading(true);

    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        alert(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          const ref = doc(db, "images", "jBjLhO8DPH9MpCq0mkQO");
          await updateDoc(ref, { [name]: url });
          if (name === "logo") {
            states.setLogo(url);
          } else states.setFavicon(url);
          alert("Your changes successfully saved");
        } catch (error) {
          console.log(error);
          alert("Opp!, There was an error occured");
        }
        setLoading(false);
      }
    );
  }

  return (
    <section className='icons-container'>
      <div>
        <div className='item'>
          <div className='flex justify-center'>
            {states.logo && (
              <Image width={100} height={50} src={states.logo} alt='' />
            )}
          </div>
          <button disabled={loading} onClick={() => logoInput.current.click()}>
            Change Logo
          </button>
          <input
            onChange={(e) => saveImages("logo", e)}
            hidden
            type='file'
            ref={logoInput}
          />
        </div>
        <div className='item'>
          <div className='flex justify-center'>
            {states.favicon && (
              <Image width={50} height={50} src={states.favicon} alt='' />
            )}
          </div>
          <button
            disabled={loading}
            onClick={() => favIconInput.current.click()}
          >
            Change Favicon
          </button>
          <input
            onChange={(e) => saveImages("favicon", e)}
            hidden
            type='file'
            ref={favIconInput}
          />
        </div>
      </div>

      <form onSubmit={(e) => submitIcons(e)} className='social-icon'>
        <div>
          <i className='fa-brands fa-facebook text-blue-600' />
          <input
            type='url'
            name='facebook'
            value={icons.facebook}
            onChange={(e) => handleIcons(e)}
            placeholder='Enter Link'
          />
        </div>
        <div>
          <i className='fa-brands fa-youtube text-red-500' />
          <input
            type='url'
            name='youtube'
            value={icons.youtube}
            onChange={(e) => handleIcons(e)}
            placeholder='Enter Link'
          />
        </div>
        <div>
          <i className='fa-brands fa-linkedin text-blue-900' />
          <input
            type='url'
            name='linkedIn'
            value={icons.linkedIn}
            onChange={(e) => handleIcons(e)}
            placeholder='Enter Link'
          />
        </div>
        <button>Save Changes</button>
      </form>
    </section>
  );
};

export default Icons;
