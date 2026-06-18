export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const {
      nome,
      email,
      telefone,
      cpf,
      produto,
      valor,
      frete,
      tamanho,
      nomePersonalizado
    } = req.body;

    if (!nome || !telefone || !valor) {
      return res.status(400).json({
        error: "Nome, telefone e valor são obrigatórios."
      });
    }

    const valorEmCentavos = Math.round(Number(valor) * 100);

    const payload = {
      amount: valorEmCentavos,
      payment_method: "pix",
      customer: {
        name: nome,
        email: email || "cliente@email.com",
        phone: telefone,
        document: cpf || undefined
      },
      items: [
        {
          title: produto || "Pedido",
          quantity: 1,
          unit_price: valorEmCentavos
        }
      ],
      metadata: {
        frete,
        tamanho,
        nomePersonalizado
      },
      webhook_url: `${process.env.SITE_URL}/api/invictus-webhook`
    };

    const response = await fetch(`${process.env.INVICTUS_API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.INVICTUS_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro da Invictus:", data);

      return res.status(400).json({
        error: "Erro ao criar pagamento Pix.",
        details: data
      });
    }

    return res.status(200).json({
      paymentId: data.id || data.transaction_id || data.payment_id,
      status: data.status,
      pixCopiaCola:
        data.pix_copia_cola ||
        data.pix_code ||
        data.copy_paste ||
        data.qr_code_text ||
        data.pix?.copy_paste,
      qrCode:
        data.qr_code_image ||
        data.qr_code_base64 ||
        data.qrcode ||
        data.qr_code ||
        data.pix?.qr_code_image,
      raw: data
    });

  } catch (error) {
    console.error("Erro interno:", error);

    return res.status(500).json({
      error: "Erro interno ao gerar Pix."
    });
  }
}
