/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditStudents from "./components/EditStudents";
import "../src/App.css"

function App() {
  const [status, setStatus] = useState("Öğrenci No");
  const [filtered, setFiltered] = useState("Ada göre");
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [addForm, setaddForm] = useState(false);
  const [stdNumber, setStdNumber] = useState("");
  const [stdName, setStdName] = useState("");
  const [stdSurname, setStdSurname] = useState("");
  const [stdClass, setStdClass] = useState("");
  const [update, setUpdate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [select, setSelect] = useState({
    id: "",
    number: "",
    name: "",
    surname: "",
    stdClass: "",
  });

  /*useEffect(() =>
    //read
    {
      axios
        .get("http://localhost:3004/students")
        .then(response) => {
           if(search.lenght===0){
            setTimeout(() => {
              setStudents(response.data);
            }, 100)};

            if (search.lenght!===0){
              var aramaStd=students.filter(item=>item.name.inCludes(search))
            setStudents(aramaStd)}

        
        .catch((error) => {
          console.log(error)
        })}
    }, [search]);*/

  useEffect(() =>
    //read
    {
      axios
        .get("http://localhost:3004/students")
        .then((response) => {
          setTimeout(() => {
            setStudents(response.data);
          }, 100);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [update]);

  useEffect(() => {
    axios
      .get("http://localhost:3004/students")
      .then((res) => {
        console.log(filtered);
        const siraliYeni = [];
        if (filtered === "Öğrenci noya göre") {
          const siraliYeni = res.data.sort(function (a, b) {
            return a.number - b.number;
          });
          setStudents(siraliYeni);
        }
        if (filtered === "Ada göre") {
          const siraliYeni = res.data.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
          setStudents(siraliYeni);
        }
        if (filtered === "Soyadına göre") {
          const siraliYeni = res.data.sort(function (a, b) {
            if (a.surname > b.surname) {
              return 1;
            }
            if (a.surname < b.surname) {
              return -1;
            }
            return 0;
          });
          setStudents(siraliYeni);
        }
        if (filtered === "Sınıfa göre") {
          const siraliYeni = res.data.sort(function (a, b) {
            if (a.stdClass < b.stdClass) {
              return -1;
            }
            if (a.stdClass > b.stdClass) {
              return 1;
            }
            return 0;
          });
          setStudents(siraliYeni);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filtered]);

  //erken kaçış
  /*if(students===null){
    return(
      <h1>Loading...</h1>
    )
  }*/
  const handleAdd = (event) => {
    event.preventDefault();
    if (
      stdNumber === "" ||
      stdName === "" ||
      stdSurname === "" ||
      stdClass === ""
    ) {
      alert("Bütün alanları doldurunuz...");
      return;
    }
    const hasStudent = students.find((item) => item.number === stdNumber);
    console.log(hasStudent);
    if (hasStudent !== undefined) {
      alert("Bu öğrenci numarası kullanıyor");

      return;
    }

    const newStudent = {
      id: String(new Date().getTime()),
      number: stdNumber,
      name: stdName,
      surname: stdSurname,
      stdClass: stdClass,
    };
    //create
    axios
      .post("http://localhost:3004/students", newStudent)
      .then((response) => {
        setStudents([...students, newStudent]);
        setaddForm(false);
        setStdNumber("");
        setStdName("");
        setStdSurname("");
        setStdClass("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (studentId) => {
    axios
      .delete(`http://localhost:3004/students/${studentId}`)
      .then((response) => {
        setUpdate(!update);
        /*const filitreli=students.filter(item=>item.id!==studentId)
    setStudents(filitreli)*/
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSortName = () => {
    axios
      .get("http://localhost:3004/students")
      .then((response) => {
        const sıralı = response.data.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setStudents(sıralı);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSortSurname = () => {
    axios
      .get("http://localhost:3004/students")
      .then((response) => {
        const sıralı = response.data.sort(function (a, b) {
          if (a.surname < b.surname) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setStudents(sıralı);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSortNumber = () => {
    axios
      .get("http://localhost:3004/students")
      .then((response) => {
        const sıralı = response.data.sort(function (a, b) {
          return a.number - b.number;
        });
        setStudents(sıralı);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*const handleSortstdClass = () => {
    axios
      .get("http://localhost:3004/students")
      .then((response) => {
      const sıralı= response.data.sort(function (a, b) {
        return a.stdClass-b.stdClass  
        });
        setStudents(sıralı)
      })
      .catch((error) => {
        console.log(error);
      });
  }*/
  const handleSortstdClass = () => {
    axios
      .get("http://localhost:3004/students")
      .then((response) => {
        const sıralı = response.data.sort(function (a, b) {
          if (a.stdClass < b.stdClass) {
            return -1;
          }
          if (a.stdClass > b.stdClass) {
            return 1;
          }
          return 0;
        });
        setStudents(sıralı);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (students === null) {
    return <h1> Loading...</h1>;
  }

 var filteredStudents = [];

  switch (status) {
    case "Öğrenci no":
      filteredStudents = students.filter((item) => {
        return item.number.includes(search);
      });
      break;
    case "Adı":
      filteredStudents = students.filter((item) => {
        return item.name.includes(search.toUpperCase());
      });

      break;
    case "Soyadı":
      filteredStudents = students.filter((item) => {
        return item.surname.includes(search.toUpperCase());
      });
      break;
    case "Sınıfı":
      filteredStudents = students.filter((item) => {
        return item.stdClass.includes(search.toUpperCase());
      });
      break;

    default:
      filteredStudents =students;

      break;
  }


  return (
    <div>
      <nav className="navbar navbar-dark bg-success">
        <div className="container-fluid">
          <h2 className="navbar-brand">
            <b> Öğrenci Kayıt Sistemi </b>
          </h2>
        </div>
      </nav>
      
      <div className="arama "style={{ height: "38px", width:"500px" ,font: "bolder",padding:"10px",}} >
        
        <div>
            <select
            className=" d-flex justify-content-center"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ height: "38px", font: "bolder" }}
            >
              <option value="Öğrenci no">Öğrenci numarası</option>
              <option value="Adı">Adı</option>
              <option value="Soyadı">Soyadı</option>
              <option value="Sınıfı">Sınıfı</option>
            </select>
          </div>
          <input
          style={{ height: "38px", font: "bolder" }}
            type="text"
            className="form-control d-flex justify-content-center"
            placeholder="Aradığınız Öğrenciyi Yazınız.."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value.toUpperCase());
            }}
          ></input>
          </div>
      
      
      <div className="container my-5">
        <div className=" d-flex justify-content-between">
          {/*<input type="text" className="form-control w-50 mx-3 " placeholder="Öğrenci arama..." value={search} onChange={(event)=>{setSearch(event.target.value.toUpperCase())}}/>*/}
          
          <div>
            <div>
              <select className="form-control "
                value={filtered}
                onChange={(event) => {
                  setFiltered(event.target.value);
                }}
                style={{ height: "38px", font: "small" }}
              >
                <option value="Öğrenci noya göre">
                  Öğrenci Noya Göre Sırala
                </option>
                <option value="Ada göre">Ada Göre Sırala</option>
                <option value="Soyadına göre">Soyada Göre Sırala</option>
                <option value="Sınıfa göre">Sınıfına Göre Sırala</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => {
              setaddForm(!addForm);
            }}
            className={`${
              addForm === false
                ? "btn  btn-outline-success"
                : "btn btn-sm btn-outline-warning"
            }`}
          >
            {addForm === false ? "Öğrenci Ekle" : " vazgeç"}
          </button>
          
        </div>
        {addForm === true && (
          <form onSubmit={handleAdd} className="container w-50 mx-auto my-4">
            <div className="mb-3">
              <label htmlFor="stdNum" className="form-label">
                Öğrenci Numarası
              </label>
              <input
                value={stdNumber}
                onChange={(event) => setStdNumber(event.target.value)}
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
                value={stdName}
                onChange={(event) =>
                  setStdName(event.target.value.toUpperCase())
                }
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
                value={stdSurname}
                onChange={(event) =>
                  setStdSurname(event.target.value.toUpperCase())
                }
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
                value={stdClass}
                onChange={(event) =>
                  setStdClass(event.target.value.toUpperCase())
                }
                type="text"
                id="stdClass"
                className="form-control"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-success">Kaydet</button>
              <button
                onClick={() => {
                  setaddForm(!addForm);
                }}
                className="btn btn-outline-warning mx-3"
              >
                Vazgeç
              </button>
            </div>
          </form>
        )}

        <table className="table my-5">
          <thead>
            <tr>
              <th scope="col">
                <button
                  onClick={handleSortNumber}
                  className="btn btn-sm btn-outline-primary my-2"
                >
                  Öğrenci No
                </button>
              </th>
              <th scope="col">
                {" "}
                <button
                  onClick={handleSortName}
                  className="btn btn-sm btn-outline-primary my-2"
                >
                  Adı
                </button>
              </th>
              <th scope="col">
                <button
                  onClick={handleSortSurname}
                  className="btn btn-sm btn-outline-primary my-2"
                >
                  Soyadı
                </button>
              </th>
              <th scope="col">
                <button
                  onClick={handleSortstdClass}
                  className="btn btn-sm btn-outline-primary my-2"
                >
                  Sınıfı
                </button>
              </th>
              <th style={{ color: "#007bff", padding: "0px 0px 15px 30px" }}>
                İşlemler
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.number}</td>
                <td>{student.name}</td>
                <td>{student.surname}</td>
                <td>{student.stdClass}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(student.id);
                    }}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Sil
                  </button>
                  <button
                    onClick={() => {
                      setEdit(true);
                      setSelect(student);
                    }}
                    className="btn btn-sm mx-2 btn-outline-dark"
                  >
                    Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {edit && (
        <EditStudents
          update={update}
          setUpdate={setUpdate}
          students={students}
          select={select}
          setEdit={setEdit}
        />
      )}
    </div>
  );
}

export default App;
