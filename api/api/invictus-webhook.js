export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const event = req.body;

    console.log("Webhook recebido da Invictus:", JSON.stringify(event, null, 2));

    const status =
      event.status ||
      event.payment_status ||
      event.transaction_status ||
      event.data?.status;

    const paymentId =
      event.id ||
      event.payment_id ||
      event.transaction_id ||
      event.data?.id;

    if (
      status === "paid" ||
      status === "approved" ||
      status === "completed" ||
      status === "PAID" ||
      status === "APPROVED"
    ) {
      console.log("Pagamento aprovado:", paymentId);

      // Aqui depois você pode salvar em banco de dados,
      // mandar WhatsApp, e-mail ou liberar pedido.
    }

    return res.status(200).json({
      received: true
    });

  } catch (error) {
    console.error("Erro no webhook:", error);

    return res.status(500).json({
      error: "Erro ao processar webhook."
    });
  }
}
