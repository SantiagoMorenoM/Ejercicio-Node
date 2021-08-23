
const axios = require('axios');
const fs= require('fs');
const http= require('http');


http.createServer(function (req,res){
    var clientes=new Array();
    var html='';
    var proveedores=new Array();
    res.writeHead(200,{'Content-Type':'text/html'});
    async function getDataFromClientServer(){
        const dataClientes = await axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json');
        for(let i=0;i<dataClientes.data.length;i++){
        clientes[i]={
            "idCliente":dataClientes.data[i].idCliente,
            "NombreCompania":dataClientes.data[i].NombreCompania,
            "NombreContacto":dataClientes.data[i].NombreContacto,
            "CargoContacto":dataClientes.data[i].CargoContacto,
            "Direccion":dataClientes.data[i].Direccion,
            "Ciudad":dataClientes.data[i].Ciudad,
            "Region":dataClientes.data[i].Region,
            "CodPostal":dataClientes.data[i].CodPostal,
            "Pais":dataClientes.data[i].Pais,
            "Telefono":dataClientes.data[i].Telefono,
            "Fax":dataClientes.data[i].Fax
        };
    }
       
    }
    async function getDataFromProviderServer(){
        const dataProveedores = await axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');
        for(let i=0;i<dataProveedores.data.length;i++){
        proveedores[i]={
            "idproveedor":dataProveedores.data[i].idproveedor,
            "nombrecompania":dataProveedores.data[i].nombrecompania,
            "nombrecontacto":dataProveedores.data[i].nombrecontacto,
            "cargocontacto":dataProveedores.data[i].cargoContacto,
            "direccion":dataProveedores.data[i].direccion,
            "ciudad":dataProveedores.data[i].ciudad,
            "region":dataProveedores.data[i].region,
            "codPostal":dataProveedores.data[i].codPostal,
            "pais":dataProveedores.data[i].pais,
            "telefono":dataProveedores.data[i].telefono,
            "fax":dataProveedores.data[i].fax,
            "paginaprincipal":dataProveedores.data[i].paginaprincipal
        };
    }
     
    }

    let texto='';
    console.log('url', req.url);
    if(req.url=='/api/proveedores'){
    texto='<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"> <h1 style="text-align:center">Lista de Proveedores</h1>  <br><table class="table table-striped"> <tr><th>Id Proveedor</th> <th>Nombre Compania</th><th>Nombre Contacto</th> </tr>';
    
    getDataFromProviderServer().then(function(){
        for(let i=0;i<proveedores.length;i++){
            texto+='<tr><th>'+proveedores[i].idproveedor+'</th> <th>'+proveedores[i].nombrecompania+'</th><th>'+proveedores[i].nombrecompania+'</th> </tr>';
        }
        fs.writeFile('file.txt',texto,'utf-8',(err)=>{
            if(err) console.log('error writing file');
         });
         fs.readFile('file.txt','utf8',(err,data)=>{
            if(err) res.end('error reading file file');
        else
            res.end(data);}) 
        });}
    else if(req.url=='/api/clientes'){
       
     texto= '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"> <h1 style="text-align:center">Lista de Clientes</h1>  <br><table class="table table-striped"> <tr><th>Id Cliente</th> <th>Nombre Compania</th><th>Nombre Contacto</th> </tr>';
     
     
    getDataFromClientServer().then(function(){
        for(let i=0;i<clientes.length;i++){
            texto+='<tr><th>'+clientes[i].idCliente+'</th> <th>'+clientes[i].NombreCompania+'</th><th>'+clientes[i].NombreContacto+'</th> </tr>';
        }
        fs.writeFile('file.txt',texto,'utf-8',(err)=>{
            if(err) console.log('error writing file');
         });
         fs.readFile('file.txt','utf8',(err,data)=>{
            if(err) res.end('error reading file file');
        else
            res.end(data);
    });
      
        });}
    else
    res.end('api');
}).listen(8081);

