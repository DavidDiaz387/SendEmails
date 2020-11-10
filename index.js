const {google} = require("googleapis");
const {OAuth2} = google.auth

const oAuth2Client = new OAuth2(`911198318300-kv0ufm7gk7k6o41i46l2q5fq4ec9huhl.apps.googleusercontent.com`,`lg9PyGBo7F8Vm_szV3IzLZgO`)

oAuth2Client.setCredentials({
    refresh_token:'1//0458FSYysa_MlCgYIARAAGAQSNwF-L9IrBZ2lMQnMiOgLkVuHD5t_lg0YdieLJXAjHEjjEnHMZqd7fyYLfnseQDuvjPWkwSkYetQ'
})

const calendar = google.calendar({version:`v3`,auth:oAuth2Client})

let eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay())

let eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay())
eventEndTime.setMinutes(eventEndTime.getMinutes()+45)

const event = {
    summary: 'Recordatorio Luz Azul',
    location: 'Asamblea 2589, capital federal',
    description:'Mensaje de recordatorio de Pedidos de productos de Luz Azul',
    start:{
        dateTime:eventStartTime,
        timeZone:'(GMT-03:00) Argentina Standard Time - Buenos Aires'
    },
    end:{
        dateTime:eventEndTime,
        timeZone:'(GMT-03:00) Argentina Standard Time - Buenos Aires'
    },
    attendees: [
        {email: 'chamorro.sandry@gmail.com'},
        {email: 'jdaviddz739@gmail.com'}
    ],
    reminders: {
        useDefault: false,
        overrides: [
            {method: 'email', minutes:5000}
        ]
    },
    colorId:1
}

calendar.freebusy.query({
    resource:{
        timeMin:eventStartTime,
        timeMax:eventEndTime,
        timeZona:'BuenosAires/Argentina',
        items:[{id:'primary'}]
    }
},(err,res)=>{
    if(err) return console.log('Free Busy Query Error', err);
    const eventsArr = res.data.calendars.primary.busy

    if(eventsArr.length === 0) return calendar.events.insert({calendarId:'primary',resource:event},err =>{
        if(err) return console.log('Calendar Event Creating err', err)
        return console.log('Calendar Event Created.');
    })
    return console.log('Sorry IM Busy');
})
