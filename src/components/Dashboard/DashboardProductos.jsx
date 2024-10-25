import { useState } from 'react';
import { BarChart, ShoppingCart, Package, DollarSign, Edit, Trash2 } from 'lucide-react'

const stat = "stat bg-theme-secondary shadow rounded-lg primary-theme border";

const allProducts = [
  { id: 3, name: 'Headphones', price: 149.99, stock: 200, category: 'Audio' },
  { id: 4, name: 'Camera', price: 499.99, stock: 30, category: 'Photography' },
  { id: 5, name: 'Keyboard', price: 79.99, stock: 150, category: 'Accessories' },
  { id: 6, name: 'Monitor', price: 199.99, stock: 80, category: 'Electronics' },
  { id: 7, name: 'Mouse', price: 49.99, stock: 300, category: 'Accessories' },
  { id: 8, name: 'PC', price: 999.99, stock: 20, category: 'Electronics' },
  { id: 9, name: 'Tablet', price: 299.99,  stock: 40, category: 'Electronics' },
  { id: 10, name: 'Gaming Console', price: 499.99 , stock: 10, category: 'Gaming' },
  { id: 11, name: 'Gaming Console', price: 499.99 , stock: 10, category: 'Gaming' },
];

export default function DashboardProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalSales = 7898
  const totalProducts = allProducts.length;
  const totalTraffic = 12000;
  const totalEarnings = 15000;

  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-theme text-theme">
      <div className="container mx-auto px-4">
        <h1 className="title">
          Dashboard de Productos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={stat}>
            <div className="stat-figure text-primary">
              <ShoppingCart size={24} />
            </div>
            <div className="stat-title">Total de Ventas</div>
            <div className="stat-value text-primary">${totalSales}</div>
            <div className="stat-desc">21% más que el último mes</div>
          </div>
          <div className={stat}>
            <div className="stat-figure text-secondary">
              <Package size={24} />
            </div>
            <div className="stat-title">Productos</div>
            <div className="stat-value text-secondary">{totalProducts}</div>
            <div className="stat-desc">5 Nuevos Productos añadidos</div>
          </div>
          <div className={stat}>
            <div className="stat-figure text-accent">
              <BarChart size={24} />
            </div>
            <div className="stat-title">Tráfico</div>
            <div className="stat-value text-accent">{totalTraffic}</div>
            <div className="stat-desc">Incremento un 25%</div>
          </div>
          <div className={stat}>
            <div className="stat-figure text-info">
              <DollarSign size={24} />
            </div>
            <div className="stat-title">Ganancia</div>
            <div className="stat-value text-info">${totalEarnings}</div>
            <div className="stat-desc">Incremento del 15%</div>
          </div>
        </div>

        <div className="bg-theme shadow rounded-lg overflow-x-auto border border-[--primary-color] min-h-80 max-h-[21rem] primary-theme pb-24">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>Q. {product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td className='min-w-32'>
                    <div className="dropdown dropdown-left">
                      <label tabIndex={0} className="btn secondary-theme m-1">Acciones</label>
                      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-4 bg-theme border primary-theme">
                        <li>
                          <button 
                            className="btn primary-theme w-full" 
                          >
                            <Edit size={18} />
                          </button>
                        </li>
                        <li>
                          <button 
                            className="btn error-theme w-full" 
                          >
                            <Trash2 size={18} />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-around mt-6">
          <div className="btn-group">
            <button 
              className="btn btn-outline"
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button 
                key={index + 1}
                className={`btn mx-1 w-14 ${currentPage === index + 1 ? 'btn-active' : 'btn-outline'}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button 
              className="btn btn-outline"
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
