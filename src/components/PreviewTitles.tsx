const PreviewTitles = () =>{
    const fileList: FileList | null = (document.getElementById('title-file') as HTMLInputElement).files;
    
    const list: HTMLDivElement | null = document.getElementById('title-list') as HTMLDivElement;
  
    if (!list) return false;
  
    list.innerHTML = '';
  
  
    if (!fileList  || fileList.length === 0) return false;
  
    let index = 0;
  
      const row: HTMLDivElement = document.createElement('div');
      row.classList.add('flex', 'justify-center');  
      const cell: HTMLDivElement = document.createElement('div');
      cell.style.width = `70%`; // 셀의 너비 설정

      const fileName: HTMLParagraphElement = document.createElement('p');
      cell.appendChild(fileName);

      const reader: FileReader = new FileReader();
      reader.onload = (event) => {
        const img: HTMLImageElement = document.createElement('img');
        img.src = event.target!.result as string;
        img.style.maxWidth = '100%'; // 이미지 너비를 셀 너비에 맞춤
        img.style.maxHeight = '100%'; // 이미지 너비를 셀 너비에 맞춤
        
        cell.appendChild(img);
      };
      reader.readAsDataURL(fileList[index]);

      row.appendChild(cell);
      index++;
    

      list.appendChild(row);
    
    return true;
  }

  export default PreviewTitles
;