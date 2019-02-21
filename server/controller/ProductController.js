import { Op } from 'sequelize';
import db from '../database/models';

const {
  Product,
  Category,
  Department,
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
          exclude: ['product_id']
        },
      offset,
      limit
    };

    if (department) {
      queryBuilder.include = {
        model: Department,
        where: {
          name: {
            [Op.iLike]: `%${req.query.department}%`
          }
        }
      };
      queryBuilder.include = {
        model: Category,
      };
    }

    if (category) {
      queryBuilder.include = {
        model: Category,
        where: {
          name: {
            [Op.iLike]: `%${req.query.category}%`
          }
        }
      };
    }

    if (search) {
      queryBuilder.where = {
        [Op.or]: [{
          name: {
            [Op.iLike]: `%${req.query.search}%`
          }
        }, {
          description: {
            [Op.iLike]: `%${req.query.search}`
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
        const { count } = products;
        const pageCount = Math.ceil(count / limit);
        return res.status(200).json({
          paginationMeta: {
            currentPage: page,
            pageSize: limit,
            totalCount: count,
            resultCount: products.rows.length,
            pageCount
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
    Product.findOne({
      attributes:
        {
          exclude: ['product_id']
        },
      include: [{
        model: Department
      }, {
        model: Category
      }
      ],
      where: {
        id
      }
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
