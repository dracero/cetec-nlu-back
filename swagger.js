export default
{
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Servidor NLU",
        "description": "Servidor para las altas, bajas y modificaciones de los NLU.",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "host": "https://cetec-nlu-back-production.up.railway.app",
    "basePath": "/",
    "schemes": ["https"],
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "paths": {


        "/nlu_structures": {
            "get": {
                "tags": [
                    "NLUs"
                ],
                "summary": "Obtener todos los NLUs del sistema",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/NLUS"
                        }
                    },
                    "500": {
                        "description": "ERROR",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/nlu_structure_name": {
            "get": {
                "tags": [
                    "NLUs"
                ],
                "summary": "Obtener un NLU específico",
                "parameters": [

                    {
                        "name": "name",
                        "type": "string",
                        "in": "query",
                        "description": "El nombre del NLU"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/NLU"
                        }
                    },
                    "500": {
                        "description": "ERROR",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/nlu_assembly": {
            "get": {
                "tags": [
                    "NLUs"
                ],
                "summary": "Obtener 4 NLUs recibidos por parámetro",
                "parameters": [
                    {
                        "name": "intent",
                        "type": "string",
                        "in": "query",
                    },
                    {
                        "name": "entity",
                        "type": "string",
                        "in": "query",
                    },
                    {
                        "name": "role",
                        "type": "string",
                        "in": "query",
                    },
                    {
                        "name": "trait",
                        "type": "string",
                        "in": "query",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/NLUAssembly"
                        }
                    },
                    "500": {
                        "description": "ERROR",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/nlu_structure": {
            "post": {
                "tags": [
                    "NLUs"
                ],
                "summary": "Agregar un nuevo NLU",
                "parameters": [{
                        "name": "name",
                        "type": "string",
                        "in": "query",
                        "description": "El nombre del NLU"
                    },
                    {
                        "name": "text",
                        "type": "string",
                        "in": "query",
                        "description": "El texto del NLU"
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "Se ha agregado un nuevo NLU"
                    },
                    "500": {
                        "description": "ERROR",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/nlu_structure/{id}": {

            "put": {
                "tags": [
                    "NLUs"
                ],
                "summary": "Actualizar un NLU",
                "parameters": [
                    {
                        "name": "id",
                        "type": "string",
                        "in": "path",
                        "description": "ID del NLU"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "in": "query",
                        "description": "Nuevo nombre del NLU"
                    },
                    {
                        "name": "text",
                        "type": "string",
                        "in": "query",
                        "description": "Nuevo texto del NLU"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "NLU actualizado"
                    },
                    "500": {
                        "description": "ERROR",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "NLUs"
                ],
                "summary": "Eliminar un NLU",
                "parameters": [

                    {
                        "name": "id",
                        "type": "string",
                        "in": "path",
                        "description": "El ID del NLU"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "NLU eliminado"
                    },
                    "500": {
                        "description": "ERROR",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/auth/google": {
            "get": {
                "tags": [
                    "Autenticación"
                ],
                "summary": "Autenticación con Google Passport",
                "responses": {
                    "200": {
                        "description": "OK",
                    },
                    "500": {
                        "description": "ERROR",
                    }
                }
            }
        },
        "/auth/google/callback": {
            "get": {
                "tags": [
                    "Autenticación"
                ],
                "summary": "Se asigna un token al usuario",
                "responses": {
                    "200": {
                        "description": "OK",
                    },
                    "500": {
                        "description": "ERROR",
                    }
                }
            }
        },
        "/logout": {
            "get": {
                "tags": [
                    "Autenticación"
                ],
                "summary": "Cerrar la sesión del usuario",
                "responses": {
                    "200": {
                        "description": "OK",
                    },
                    "500": {
                        "description": "ERROR",
                    }
                }
            }
        }
    },
    "definitions": {

        "NLU": {
            "required": [
                "name",
                "text",
                "id"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "text": {
                    "type": "string"
                },
                "id": {
                    "type": "string",
                    "uniqueItems": true
                }
            }
        },
        "NLUAssembly": {
            "required": [
                "intent",
                "entity",
                "role",
                "trait"
            ],
            "properties": {
                "intent": {
                    "type": "string"
                },
                "entity": {
                    "type": "string"
                },
                "role": {
                    "type": "string"
                },
                "trait": {
                    "type": "string"
                }
            }
        },
        "NLUS": {
            "required": [
                "nlus"
            ],
            "properties": {
                "nlus": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/NLU"
                    }
                }
            }
        },
        "Error": {
            "required": [
                "code",
                "message",
                "id"
            ],
            "properties": {
                "code": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            }
        }
    }
}
