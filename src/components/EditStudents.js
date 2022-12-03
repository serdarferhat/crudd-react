import React,{useState} from "react";
import "../assets/edit.css";
import axios from "axios";

export default function EditStudents(props) {
  const { setEdit,select,students,setUpdate,update } = props;
  console.log(select) //verinin geldiğini gördük

  const [stdNumber, setStdNumber] = useState(select.number);
  const [stdName, setStdName] = useState(select.name);
  const [stdSurname, setStdSurname] = useState(select.surname);
  const [stdClass, setStdClass] = useState(select.stdClass);
  
  const handleEdit=(event)=>{
    event.preventDefault()
    if (
      stdNumber === "" ||
      stdName === "" ||
      stdSurname === "" ||
      stdClass === ""
    ) {
      alert("Bütün alanları doldurunuz...");
      return;}
      const filitrele=students.filter(item=>item.id!==select.id)
      const hasStudent = filitrele.find((item) => item.number === stdNumber);
    console.log(hasStudent);
    if (hasStudent !== undefined) {
      alert("Bu öğrenci numarası kullanıyor");

      return;
    }

    const updatedStudent = {
      ...select,
      number: stdNumber,
      name: stdName,
      surname: stdSurname,
      stdClass: stdClass,
  }
    axios.put(`http://localhost:3004/students/${select.id}`,updatedStudent)
    .then((response)=>{
      setEdit(false)
      setUpdate(!update)
    })
   
}
  
  return (
    <div className="modalMainContainer">
      <div className="modalContainer">
        <h1 className="modall text-center"><b>Öğrenci Düzenle</b></h1>
        <form onSubmit={handleEdit} className=" container w-75 mx-auto">
            <div className="mb-3">
              <label htmlFor="stdNum" className="form-label">
                Öğrenci Numarası
              </label>
              <input
                value={stdNumber} onChange={(event)=>setStdNumber(event.target.value)}
                type="text"
                id="stdNum"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stdName" className="form-label">
                Öğrenci Adı
              </label>
              <input
                value={stdName} onChange={(event)=>setStdName(event.target.value.toUpperCase())}
                type="text"
                id="stdName"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stdSur" className="form-label">
                Öğrenci Soyadı
              </label>
              <input
                value={stdSurname} onChange={(event)=>setStdSurname(event.target.value.toUpperCase())}
                type="text"
                id="stdSur"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stdClass" className="form-label">
                Öğrenci Sınıfı
              </label>
              <input
               value={stdClass} onChange={(event)=>setStdClass(event.target.value.toUpperCase())}
                type="text"
                id="stdClass"
                className="form-control"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-sm btn-success mt-2">Kaydet</button>
              <button onClick={() => setEdit(false)} className="btn btn-sm btn-warning mx-2 mt-2" >Kapat</button>
            </div>
          </form>
        
      </div>
    </div>
  );
}
