const getReplyTemplate = async (req, res) => {

    const { type } = req.body;
  
    const templates = {
  
      acknowledge:
        "Thank you for the update. I have reviewed the information and will proceed accordingly.",
  
      review:
        "Thank you for sharing this. I will review the details and get back to you shortly.",
  
      delay:
        "Thank you for your patience. I am currently reviewing this and will provide an update soon.",
  
      decline:
        "Thank you for considering me. Unfortunately, I won't be able to participate at this time."
  
    };
  
    res.json({
      reply:
        templates[type] ||
        templates.acknowledge
    });
  
  };
  
  module.exports = {
    getReplyTemplate
  };