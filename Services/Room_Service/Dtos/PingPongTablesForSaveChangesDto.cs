using System.Collections.Generic;

namespace Room_Service.Dtos
{
    public class PingPongTablesForSaveChangesDto
    {
        public IEnumerable<int> TablesToDeleteIds { get; set; }
        public IEnumerable<PingPongTableForUpdateDto> TablesToUpdate { get; set; }
        public IEnumerable<PingPongTableForAddDto> TablesToAdd { get; set; }
    }
}