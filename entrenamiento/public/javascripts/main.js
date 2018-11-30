window.onload = () => app.init();

let app = {
    init: function () {
        this.addEvents();
        this.loadContent();
    },

    addEvents: function () {
        let form = document.saveDocumento;
        form.addEventListener('submit', this.submit);
    },
    loadContent: function () {
        fetch('/documento')
            .then(res => {
                return res.json()
            }).then(data => {
                let documentos = document.getElementsByClassName('documentos')[0];
                documentos.innerHTML = data.reduce((cadena, element) => {
                    return cadena +
                        `<tr>
                        <td class="nombreDocumento">${element.nombreDocumento}</td>
                        <td class="propietario">${element.propietario}</td>
                        <td class="opciones"> 
                            <a data-id="${element._id}" class="btn btn-danger delete" href="#"> Delete </a> 
                            <a data-id="${element._id}" class="btn btn-success more" href="#"> More </a>
                            <a data-id="${element._id}" class="btn btn-warning edit" href="#"> Edit </a>  
                        </td>
                    </tr>`
                }, "");

                document.querySelectorAll(".delete").forEach(element => {
                    element.addEventListener('click', function (event) {
                        event.preventDefault();
                        let id = element.getAttribute("data-id");
                        fetch('/documento/' + id, {
                            method: 'DELETE'
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.success) {
                                    documentos.removeChild(element.parentElement.parentElement);
                                    console.log("documento eliminado con exito");
                                }
                            }).catch(err => {
                                console.log(err);
                            });
                    });
                });

                document.querySelectorAll(".more").forEach(element => {
                    element.addEventListener('click', function (event) {
                        event.preventDefault();
                        console.log(this.parentElement.parentElement.getElementsByTagName('td')[0].innerText)
                        let nombreDocumento = this.parentElement.parentElement.getElementsByTagName('td');
                        alert("Documento: " + nombreDocumento[0].innerText + '\n' + "Dueño: " + nombreDocumento[1].innerText);
                    });
                });

                document.querySelectorAll(".edit").forEach(element => {
                    element.addEventListener('click', function (event) {
                        event.preventDefault();
                        let id = element.getAttribute("data-id");
                        fetch('/documento/' + id)
                            .then(res => res.json()
                            ).then(data => {
                                let form = document.forms.saveDocumento;

                                form.nombreDocumento.value = data.nombreDocumento;
                                form.propietario.value = data.propietario;
                                form.action = "/documento/" + data._id;
                            });
                    });
                });
            });
    },
   submit: function (event) {
        event.preventDefault();
        let form = document.saveDocumento;
        console.log("enviando formularios");
        let documento = {
            nombreDocumento: form.nombreDocumento.value,
            propietario: form.propietario.value
        };
        if (form.action.split('/').pop() == 'documento') {
            fetch(form.action, {
                method: 'POST',
                body: JSON.stringify(documento),
                headers: {
                    'Content-Type': 'application/json' //solo para mandar datos
                }
            }).then(res => {
                return res.json();
            }).then(data => {
                if (data.success) {
                    let tr = document.createElement("tr");
                    tr.innerHTML = `<td>${documento.nombreDocumento}</td>
                                    <td>${documento.propietario}</td>`;
                    document.getElementsByClassName("documentos")[0].appendChild(tr);
                } else {
                    let err = document.getElementsByClassName('erros')[0];
                    err.innerHTML = "Ya existe un documento con el mismo nombre";
                }
            });
        } else {
            fetch(form.action, {
                method: 'PUT',
                body: JSON.stringify(documento),
                headers: {
                    'Content-Type': 'application/json' //solo para mandar datos
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.success) {
                        form.action = '/documento';
                        form.method = 'POST';
                        alert('Los datos fuero actualizados ');
                        form.nombreDocumento.value = form.nombreDocumento.value =
                            form.propietario.value = "";
                        loadContent();
                    }
                });
        }
    }
}



