const Tarea = require('./tarea');

class Tareas{
    _listado={
        'abc':123
    };

    get listadoArr(){
        const listado=[];
        //funcion propia de js
        Object.keys(this._listado).forEach(key=>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }
    constructor(){
        this._listado={};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    crearTareaFromArray(tareas=[]){
        tareas.forEach(tarea => {
            this._listado[tarea.id]=tarea;
        });
    }

    crearTarea(desc=''){
        const tarea= new Tarea(desc);
        this._listado[tarea.id]= tarea;
    }
    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea,i)=>{
            const idx=`${i+1}`.green;
            const{desc,completadoEn}=tarea;
            const estado = (completadoEn)
                                ?'Completada'.green
                                :'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);

        });
    }

    listarPendientesCompletados(completadas = true){
        //salto de linea
        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ?'Completada'.green
                                :'Pendiente'.red;
            if(completadas){
                //mostrar completadas
                if(completadoEn){
                    contador +=1;
                    console.log(`${(contador+'.').green} ${desc}::${completadoEn.green}`);
                }
            }
            else{
                if(!completadoEn){
                    contador += 1;
                    console.log(`${(contador+'.').green} ${desc}::${estado}`);
                }
            }
        });
    }

    toggleCompletadas(ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        //para desmarcar las tareas ya realizadas
        TouchList.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn=null;
            }
        });
    };

}

module.exports = Tareas;