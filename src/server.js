const express = require("express")
const cors = require("cors")
const db = require("./models")
const Role = db.role
const Article = db.article
const app = express()
const cookieSession = require("cookie-session");
const dotenv = require('dotenv')
const morgan = require('morgan')

//permite la conexion entre puertos configurados del front y back
app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:8081"],
    })
  );

// UNION CON ROLE
    // db.sequelize.sync({force: true}).then(() => {
    //     console.log('Drop and Resync Db')
    //     initial();
    // })
    // db.sequelize.sync().then(() => {
    //   console.log('Database synced');
    // }).catch((error) => {
    //   console.error('Error syncing database:', error);
    // });


// INITIAL
  // function initial(){
  //     Role.create({
  //         id:1,
  //         name: "user"
  //     })

  //     Role.create({
  //         id:2,
  //         name: "admin"
  //     })

      // Article.create({
      //   titulo:"TITULO AUN FORMANDO",
      //   dias_uso:0,
      //   costo:0,
      //   ejercicios: "AUN CREANDO",
      //   cant_ejer:0,
      //   tiempo_ejer:0,
      //   acceso_maquinas:"NO DISPONIBLE",
      //   consejos_nutr:"NO DISPONIBLE",
      //   agenda_semanal:"NO DISPONIBLE",
      //   horario_per:"NO DISPONIBLE",
      //   eventos:"NO DISPONIBLE",
      //   proteina:"NO DISPONIBLE",
      //   clases_per:"NO DISPONIBLE",
      // })

  //     Article.create({
  //       titulo: "BASICO",
  //       dias_uso:10,
  //       costo:20,
  //       ejercicios: "LEVANTAMIENTO DE PESAS, MANCUERNAS Y ABDOMINALES",
  //       cant_ejer:10,
  //       tiempo_ejer:15,
  //       acceso_maquinas:"NO DISPONIBLE",
  //       consejos_nutr:"NO DISPONIBLE",
  //       agenda_semanal:"NO DISPONIBLE",
  //       horario_per:"NO DISPONIBLE",
  //       eventos:"NO DISPONIBLE",
  //       proteina:"NO DISPONIBLE",
  //       clases_personales:"NO DISPONIBLE",
  //     })

  //     Article.create({
  //       titulo: "MEDIO",
  //       dias_uso:20,
  //       costo:40,
  //       ejercicios: "LEVANTAMIENTO DE PESAS, MANCUERNAS, ABDOMINALES, CAMINATA, SETADILLAS Y PLANNCHAS",
  //       cant_ejer:20,
  //       tiempo_ejer:20,
  //       acceso_maquinas:"ACERQUESE PARA COORDINAR",
  //       consejos_nutr:"ACERQUESE PARA COORDINAR",
  //       agenda_semanal:"ACERQUESE PARA COORDINAR",
  //       horario_per:"ACERQUESE PARA COORDINAR",
  //       eventos:"NO DISPONIBLE",
  //       proteina:"NO DISPONIBLE",
  //       clases_personales:"NO DISPONIBLE",
  //     })

  //     Article.create({
  //       titulo: "AVANZADO",
  //       dias_uso:30,
  //       costo:60,
  //       ejercicios: "LEVANTAMIENTO DE PESAS, MANCUERNAS, ABDOMINALES, CAMINATA, SETADILLAS, PLANNCHAS",
  //       cant_ejer:30,
  //       tiempo_ejer:30,
  //       acceso_maquinas:"ACERQUESE PARA COORDINAR",
  //       consejos_nutr:"ACERQUESE PARA COORDINAR",
  //       agenda_semanal:"ACERQUESE PARA COORDINAR",
  //       horario_per:"ACERQUESE PARA COORDINAR",
  //       eventos:"ACERQUESE PARA COORDINAR",
  //       proteina:"ACERQUESE PARA COORDINAR",
  //       clases_personales:"ACERQUESE PARA COORDINAR",
  //     })
  // }

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(morgan('dev'))
app.use(
    cookieSession({
      name: "bezkoder-session",
      keys: ["COOKIE_SECRET"],
      httpOnly: true,
    })
  );

//Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/articles.routes')(app);

//set PORT on listen
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running in PORT ${PORT}`)
})