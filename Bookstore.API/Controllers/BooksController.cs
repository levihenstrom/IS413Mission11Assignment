using Bookstore.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bookstore.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController(BookstoreContext context) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetBooks(
        int pageHowMany = 5,
        int pageNum = 1,
        bool sortByTitle = false)
    {
        pageHowMany = Math.Clamp(pageHowMany, 1, 100);
        pageNum = Math.Max(pageNum, 1);

        IQueryable<Models.Book> query = context.Books;

        if (sortByTitle)
        {
            query = query.OrderBy(b => b.Title);
        }

        var totalNumBooks = await query.CountAsync();

        var books = await query
            .Skip((pageNum - 1) * pageHowMany)
            .Take(pageHowMany)
            .ToListAsync();

        return Ok(new
        {
            books,
            totalNumBooks,
        });
    }
}
