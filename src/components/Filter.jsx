import { useEffect, useState } from "react";
import { sortOpt, statusOpt, typeOpt } from "../constants";
import Select from "./Select";
import SubmitButton from "./SubmitButton";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "../app/slices/jobSlice";
import api from "../utils/api";

const Filter = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [sort, setSort] = useState();
  const [debouncedText, setDebouncedText] = useState();
  useEffect(() => {
    if (text === undefined) return;
    const timer = setTimeout(() => setDebouncedText(text), 500);
    return () =>{
      clearTimeout(timer)
    }
  }, [text]);
  useEffect(() => {
    const sortParam =
      sort === "a-z" || "z-a"
        ? "company"
        : sort === "En Yeni" || sort === "En Eski"
        ? "date"
        : undefined;
    const orderParam =
      sort === "a-z"
        ? "asc"
        : sort === "z-a"
        ? "desc"
        : sort === "En Yeni"
        ? "desc"
        : sort === "En Eski"
        ? "asc"
        : undefined;
    const params = {
      q: text,
      _sort: sortParam,
      _order: orderParam,
      type: type || undefined,
      status: status || undefined,
    };
    dispatch(setLoading());
    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [debouncedText, sort, status, type]);
  const handleReset = (e) => {
    e.preventDefault();
    setText();
    setStatus();
    setType();
    setSort();
    setDebouncedText()
    e.target.reset();
  };
  return (
    <div className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form onSubmit={handleReset}>
        <div>
          <label>Ara</label>
          <input type="text" onChange={(e) => setText(e.target.value)} />
        </div>
        <Select
          label="Durum"
          options={statusOpt}
          handleChange={(e) => setStatus(e.target.value)}
        />
        <Select
          label={"Tür"}
          options={typeOpt}
          handleChange={(e) => setType(e.target.value)}
        />
        <Select
          label={"Sirala"}
          options={sortOpt}
          handleChange={(e) => setSort(e.target.value)}
        />
        <div>
          <SubmitButton text={"Filtreleri Sifirla"} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
