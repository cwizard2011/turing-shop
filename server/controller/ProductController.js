import { Op, Sequelize } from 'sequelize';
import db from '../database/models';

const {
  Product,
  Category,
  Department,
  AttributeValue
} = db;

/**
 * @class ProductsController
 * @description - Class for retrieving items in the database
 */
class ProductController {
  /**
     * @method getAllItems
     *
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @param {*} next - Next function
     *
     *  @returns {object} returns all items object
     */
  static getAllItems(req, res, next) {
    const {
      department, page, limit, category, searchTerm
    } = req.query;

    const offset = parseInt((page - 1), 10) * limit;

    const queryBuilder = {
      distinct: true,
      attributes:
        {
          exclude: ['createdAt', 'updatedAt']
        },
      include: [{
        model: AttributeValue,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }],
      offset,
      limit
    };

    if (department) {
      queryBuilder.include[1] = {
        model: Category,
        include: [{
          model: Department,
          where: {
            name: {
              [Op.like]: `%${req.query.department}%`
            }
          }
        }]
      };
    }

    if (department && category) {
      queryBuilder.include[1] = {
        model: Category,
        required: true,
        where: {
          name: {
            [Op.like]: `%${req.query.category}%`
          }
        },
        include: [{
          model: Department,
        }]
      };
    }

    if (searchTerm) {
      queryBuilder.where = {
        $or: [{
          name: {
            [Op.like]: `%${req.query.searchTerm}%`
          }
        }, {
          description: {
            [Op.like]: `%${req.query.searchTerm}%`
          }
        }]
      };
    }

    Product.findAndCountAll(queryBuilder)
      .then((products) => {
        if (products.rows.length < 1) {
          return res.status(404).json({
            message: 'No items at the moment in this department and category'
          });
        }
        const { count } = products;
        const pageCount = Math.ceil(count / limit);
        return res.status(200).json({
          paginationMeta: {
            currentPage: page,
            pageSize: limit,
            totalCount: count,
            resultCount: products.rows.length,
            pageCount,
          },
          items: products.rows
        });
      })
      .catch(next);
  }

  /**
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {*} next
   *
   * @returns {object} item object
   */
  static getSingleItem(req, res, next) {
    const { id } = req.params;
    Product.findByPk(id, {
      attributes:
        {
          exclude: ['createdAt', 'updatedAt']
        },
      include: [{
        model: AttributeValue,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
      ]
    }).then((product) => {
      if (!product) {
        return res.status(404).json({
          message: 'Item not found'
        });
      }
      return res.status(200).json({
        product
      });
    }).catch(next);
  }

  /**
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {*} next
   *
   * @returns {object} item object
   */
  static getAllDepartments(req, res, next) {
    Department.findAll({
      attributes: ['id', 'name', 'description'],
      include: [{
        model: Category,
        attributes: ['id', 'name', 'description'],
        include: [{
          model: Product,
          attributes: ['id', 'name', 'image', 'price', 'discounted_price']
        }]
      }
      ]
    }).then((departments) => {
      if (!departments) {
        return res.status(404).json({
          message: 'Admin has not create any department'
        });
      }
      return res.status(200).json({
        departments
      });
    }).catch(next);
  }

  /**
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {*} next
   *
   * @returns {object} item object
   */
  static getFeaturedProduct(req, res, next) {
    Product.findAll({
      attributes: ['id', 'name', 'description', 'price', 'discounted_price', 'image'],
      order: [
        [Sequelize.literal('RAND()')]
      ],
      limit: 6
    }).then((featuredItem) => {
      if (!featuredItem) {
        return res.status(404).json({
          message: 'No item at the moment'
        });
      }
      return res.status(200).json({
        featuredItem
      });
    }).catch(next);
  }
}

export default ProductController;
