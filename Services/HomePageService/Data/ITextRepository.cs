using System.Threading.Tasks;
using HomePageService.Models;

namespace HomePageService.Data
{
    public interface ITextRepository
    {
        Task<TextFieldContent> GetTextField(string textFieldName);
        Task<bool> SaveAll();
    }
}