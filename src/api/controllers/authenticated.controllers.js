export default (req, res) =>
  res.status(200).json({
    message: 'Authenticated the user successfully!',
  });
