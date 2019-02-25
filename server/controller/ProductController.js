import { Op } from 'sequelize';
import db from '../database/models';

const {
  Product,
  Category,
  Department,
  AttributeValue
} = db;

/**
 * @class ProductsController
 * @description - Class for creating and retrieving items in the database
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
      page, limit, department, category, search
    } = req.query;
    const offset = parseInt((page - 1), 10) * limit;

    const queryBuilder = {
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
      Department.findAll({
        include: [{
          model: Category,
          include: [{
            model: Product,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }]
        }]
      }).then(products => res.status(200).json({
        paginationMeta: {
          currentPage: page,
          pageSize: limit,
          resultCount: products.rows.length,
        },
        items: products.rows
      })).catch(next);
    }
    if (category) {
      queryBuilder.include = {
        model: Category,
        where: {
          name: {
            [Op.like]: `%${req.query.category}%`
          }
        }
      };
    }

    if (search) {
      queryBuilder.where = {
        $or: [{
          name: {
            [Op.like]: `%${req.query.search}%`
          }
        }, {
          description: {
            [Op.like]: `%${req.query.search}%`
          }
        }]
      };
    }


    Product.findAndCountAll(queryBuilder)
      .then((products) => {
        if (!products) {
          return res.status(404).json({
            message: 'No items at the moment'
          });
        }
        return res.status(200).json({
          paginationMeta: {
            currentPage: page,
            pageSize: limit,
            resultCount: products.rows.length,
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
        model: Category,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }, {
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
}

export default ProductController;
