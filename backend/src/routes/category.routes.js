const { Router } = require('express')
const router = Router()
const categoryCtrl = require('../controllers/category.controller')
const { adminMdlw } = require('../middlewares/admin.middleware')

router.get('/', categoryCtrl.getAllCategories)

router.get('/:id', categoryCtrl.getCategoryById)

router.post('/', adminMdlw, categoryCtrl.createCategory)

router.put('/:id', adminMdlw, categoryCtrl.updateCategory)

router.delete('/:id', adminMdlw, categoryCtrl.deleteCategory)

router.patch('/:id/toggle', adminMdlw, categoryCtrl.toggleCategoryStatus)

module.exports = router