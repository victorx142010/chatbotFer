const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { delay } = require('@whiskeysockets/baileys')

// Flujo principal utilizando el evento WELCOME
const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer('🙌 ¡Hola! Bienvenido a TOP 1 MATERIAL PUCP💯👌.', { delay: 500 })
    .addAnswer(
        'Te comparto las siguientes opciones:\n👉 Precio para conocer nuestras promociones\n👉 Yape para saber el número de pago\n👉 Finalizar para completar tu compra',
        { capture: true, delay: 500 },
        async (ctx, { gotoFlow, flowDynamic }) => {
            const userMessage = ctx.body.toLowerCase();

            if (userMessage.includes('precio')) {
                return await flowDynamic('¡Estamos en oferta!\n\n1 curso -> 38 soles💸\n2 cursos -> 42 soles💸\n3 cursos -> 46 soles💸\n\n¿Te gustaría adquirir alguno? Visita nuestra página web para más detalles: https://sites.google.com/view/top1material/cursos?authuser=0 😼👌');
            } 
            else if (userMessage.includes('yape')) {
                return await flowDynamic('El número de Yape es +51 991 308 394✅ a nombre de Diego Luna Baldwin😼\n\nEnvía la captura del Yapeo y tu correo PUCP. La entrega es inmediata 💯.\nVisita nuestra página web para ver más cursos: https://sites.google.com/view/top1material/cursos?authuser=0');
            } 
            else if (userMessage.includes('finalizar')) {
                return await flowDynamic('🎉 ¡Gracias por tu compra! Por favor, envía el comprobante del Yape junto con tu correo PUCP y el nombre de los cursos al número +51 947 359 622 para completar tu pedido. La entrega será inmediata✅💡.');
            } 
            else {
                return await flowDynamic('No entendí tu solicitud, por favor escribe Precio, Yape, o Finalizar para continuar.');
            }
        }
    )
    .addAnswer('Nota: Por favor, utiliza solo las palabras clave mencionadas. Si necesitas más ayuda, comunícate con nosotros al +51 947 359 622.\n\nSi deseas volver al menú principal, escribe menu después de seleccionar una opción.', { delay: 1000 });

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()