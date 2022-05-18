using DataTableAsp.Models;
using JQueryDatatable.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataTableAsp.Controllers
{
    public class OperationController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OperationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult AddNew(Customer model)
        {
            var result = _context.Customers.Add(model);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPut]
        public IActionResult EditItem(Customer model)
        {
            var result = _context.Customers.Update(model);
            _context.SaveChanges();
            return Ok();
        }
    }
}
