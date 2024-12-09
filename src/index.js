const express = require('express');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');
const courtRoutes = require('./routes/courts');
const adminRoutes = require('./routes/admin');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/courts', courtRoutes);

app.use('/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
