using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HomePageService.Models;

namespace HomePageService.Data
{
    public class TextRepository: ITextRepository
    {
        private readonly DataContext _context;
        public TextRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<TextFieldContent> GetTextField(string textFieldName)
        {
            return await _context.TextFieldContents.FirstOrDefaultAsync(t => t.Name == textFieldName);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}