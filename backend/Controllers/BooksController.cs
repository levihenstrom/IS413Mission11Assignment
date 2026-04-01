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
        bool sortByTitle = false,
        [FromQuery] List<string>? categories = null)
    {
        pageHowMany = Math.Clamp(pageHowMany, 1, 100);
        pageNum = Math.Max(pageNum, 1);

        IQueryable<Models.Book> query = context.Books;

        if (categories is { Count: > 0 })
        {
            query = query.Where(b => categories.Contains(b.Category));
        }

        query = sortByTitle
            ? query.OrderBy(b => b.Title)
            : query.OrderBy(b => b.BookID);

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

    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await context.Books
            .Select(b => b.Category)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync();

        return Ok(categories);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetBook(int id)
    {
        var book = await context.Books.FindAsync(id);
        if (book is null)
        {
            return NotFound();
        }

        return Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> AddBook([FromBody] Models.Book newBook)
    {
        context.Books.Add(newBook);
        await context.SaveChangesAsync();
        return Ok(newBook);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateBook(int id, [FromBody] Models.Book updatedBook)
    {
        var existingBook = await context.Books.FindAsync(id);
        if (existingBook is null)
        {
            return NotFound();
        }

        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.ISBN = updatedBook.ISBN;
        existingBook.Classification = updatedBook.Classification;
        existingBook.Category = updatedBook.Category;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;

        context.Books.Update(existingBook);
        await context.SaveChangesAsync();

        return Ok(existingBook);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await context.Books.FindAsync(id);
        if (book is null)
        {
            return NotFound();
        }

        context.Books.Remove(book);
        await context.SaveChangesAsync();

        return NoContent();
    }
}
