import React from "react";
import AutoInput from "../components/AutoInput";
import Select from "../components/Select";
import { statusOpt, typeOpt } from "../constants";
import SubmitButton from "../components/SubmitButton";
import api from "../utils/api";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createJob, setError } from "../app/slices/jobSlice";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());
    newJobData.id = v4();
    newJobData.date = Date.now();
    console.log(newJobData);

    api
      .post("/jobs", newJobData)
      .then(() => {
        toast.success("Başarıyla eklendi!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        dispatch(createJob(newJobData));
        navigate("/");
        
      })
      .catch((err) => {
        dispatch(setError(err.message));
        toast.error("Sorun oluştu");
      });
  };
  return (
    <div className="add-page">
      <section className="container">
        <h2>Yeni Is Ekle</h2>
        <form onSubmit={handleSubmit}>
          <AutoInput label={"Pozisyon"} name={"position"} />
          <AutoInput label={"Sirket"} name={"company"} />
          <AutoInput label={"Lokasyon"} name={"location"} />
          <Select label="Durum" options={statusOpt} name="status"/>
          <Select label={"Tür"} options={typeOpt}  name="type"/>
          <div>
            <SubmitButton text={"Olustur"} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
