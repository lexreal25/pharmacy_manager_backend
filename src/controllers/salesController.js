export const createSalesController = async(req, res) => {
   try {
    const newSales = await createSalesService(req.body);
    res.status(201).json({
        success: true,
        message: "Sales submitted successfully",
        data: newSales,
    })
   } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
}