using DataTableAsp.Models;
using JQueryDatatable.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;

namespace DataTableAsp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomersController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("GetCustomers")]
        public IActionResult GetCustomers()
        {
            var pageSize = int.Parse(Request.Form["length"]);
            var skipe = int.Parse(Request.Form["start"]);
            var search = Request.Form["search[value]"];
            var sortColumn = Request.Form[string.Concat("columns[",Request.Form["order[0][column]"],"][name]")];
            var sortDirecion = Request.Form["order[0][dir]"];

            

            IQueryable<Customer> cutomers = _context.Customers.Where(x => string.IsNullOrEmpty(search)
                ? true : (x.FirstName.Contains(search) || x.LastName.Contains(search) || x.Contact.Contains(search) ||x.Email.Contains(search))
            );

            if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortDirecion)))
            {
               cutomers = cutomers.OrderBy(string.Concat(sortColumn, " ", sortDirecion));
            }
            var data = cutomers.Skip(skipe).Take(pageSize).ToList();
            var recordsTotal = cutomers.Count();
            var jsonData = new { recordsFiltered = recordsTotal, recordsTotal, data};
            return Ok(jsonData);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var data = _context.Customers.Where(x => x.Id.ToString() == id).FirstOrDefault();
            _context.Customers.Remove(data);    
            _context.SaveChanges();
            return Ok(data);
        }
    }
}
