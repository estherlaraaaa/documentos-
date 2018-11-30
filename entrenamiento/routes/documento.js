var express = require('express'),
    router = express.Router(),
    documentoModel=require('../models/Documento');
var debug = require('debug')('entrenamiento:server');

router.get('/', function (req, res){
    debug('Obteniendo todos los documentos');
    documentoModel.find({}, function (err, documento){
        if (err){
            res.status(500);
            res.json({
                status: 500,
                err
            });
        }else {
            res.json(documento);
        }
    });
});

router.get('/:id', function(req,res){
    if (req.params.id){
        documentoModel.findOne({
            _id: req.params.id
        }, function (err, documento){
            if (err){
                res.status(500),
                res.json({
                    status: 500,
                    err
                });
            } else{
                res.json(documento);
            }
        });
    }else{
        res.status(400);
        res.json({
            status: 400,
            err: 'bad request'
        })
    }
});

router.post('/', function (req, res) {
    let Documento = new documentoModel({
        nombreDocumento: req.body.nombreDocumento,
        propietario: req.body.propietario,
    })

    Documento.save(function (err) {
        if (err) {
            res.status(500)
           return  res.json({
                err
            });
        }
        res.send({
            message: "saved",
            success: true
        });
    });
});

router.delete('/:id', function (req, res) {
    if (req.params.id) {
        documentoModel.findByIdAndRemove(req.params.id, function (err, documento) {
            if (err) {
                res.status(500);
                res.json({
                    status: 500,
                    success: false,
                    err
                });
            } else {
                res.json({
                    success: true,
                    delete: documento
                });
            }
        });

    } else {

        res.status(400);
        res.json({
            status: 400,
            success: false
        });
    }
});

router.put('/:id', function(req,res){
    if (req.params.id) {
        documentoModel.findByIdAndUpdate(req.params.id,{
          nombre: req.body.nombreDocumento,
          propietario: req.body.propietario,
        },function(err,updated){
            if (err){
                res.json({
                    status: 500,
                    success: false,
                    errs
                });
            } else{
                res.json({
                    status: 200,
                    success: true,
                    updated
                })
            }
        });
    }
});


module.exports = router;
