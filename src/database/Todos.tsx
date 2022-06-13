export const Todos: any = [
    [
        {
            "title": "Lista de Compras",
            "todo": [
                {
                    "task": "1 Carton de Huevos.",
                    "checked": false
                },
                {
                    "task": "2 Lechugas Frescas.",
                    "checked": false
                },
                {
                    "task": "1 lb de Jamon",
                    "checked": true
                },
            ],
            "importancy": 1,
            "status": false,
            "idUserOwner": 2
        }
    ]
]
/**
 * MODELO PARA CADA LISTA TO-DO
 * 
 * Se utilizara un titulo para la tarea y un sub-array para
 * el manejo de cada task a realizarse, estas contaran con la 
 * Task = Tarea a realizarse y Checked = boolean, para saber si ha sido completada o no.
 * 
 * Se manejara un estado de importancia de (1 - 3)
 * Siendo el 1 = Mas Importante y 3 = Menos Importante
 * para saber la prioridad de esa tarea.
 * 
 * Se manejara un Status para saber si la tarea ha sido completada o No.
 * 
 * Y se manejara un id del Usuario que la creo para asi poder crear la 
 * Relacion con el dueño de esas tareas.
 */

let array = [
    {
        "title": "Lista de Compras",
        "todo": [
            {
                "task": "1 Carton de Huevos.",
                "checked": false
            },
            {
                "task": "2 Lechugas Frescas.",
                "checked": false
            },
            {
                "task": "1 lb de Jamon",
                "checked": true
            },
        ],
        "importancy": 1,
        "status": false,
        "idUserOwner": 1
    },
    {
        "title": "Lista de Compras",
        "todo": [
            {
                "task": "1 Carton de leche.",
                "checked": false
            },
            {
                "task": "2 brocolis Frescos.",
                "checked": true
            },
            {
                "task": "1 lb de pollo",
                "checked": false
            },
        ],
        "importancy": 1,
        "status": false,
        "idUserOwner": 2
    }
]

let actual = {
    idUser: 2,
    idTodo: 2,
    checked: true
}


const checkear = (actual: any) => {
    let newArray = array.map((user) => {
        if (user.idUserOwner === actual.idUser) {
            return user.todo.map((elemento, indice) => {
                if (indice === actual.idTodo) {
                    return { ...elemento, checked: actual.checked }
                } else {
                    return elemento;
                }
            })
        } else {
            return user;
        }
    });

    return newArray;
}

console.log(checkear(actual))