export const PreviewFiles = () =>{
    const fileList: FileList | null = (document.getElementById('dropzone-file') as HTMLInputElement).files;
  
    if (fileList?.length === 0 || !fileList) return false;
  
    const list: HTMLDivElement | null = document.getElementById('file-list') as HTMLDivElement;
  
    if (!list) return false;
  
    list.innerHTML = '';
  
    const maxImages = 20; // 최대 이미지 개수
    const numCols = 5; // 열당 이미지 갯수
    const numRows = Math.ceil(Math.min(fileList.length, maxImages) / numCols); // 행 갯수 계산
  
    const cellWidth = 100 / numCols; // 각 셀의 너비 계산
  
    let index = 0;
  
    for (let i = 0; i < numRows; i++) {
      const row: HTMLDivElement = document.createElement('div');
      row.classList.add('flex'); // 행을 플렉스 박스로 설정하여 가로로 정렬
  
      for (let j = 0; j < numCols; j++) {
        if (index >= fileList.length) break; // 파일 개수를 초과하면 종료
  
        const cell: HTMLDivElement = document.createElement('div');
        cell.style.margin = '5px'; // 이미지들 사이에 5px 간격 추가
        cell.style.width = `${cellWidth}%`; // 셀의 너비 설정
  
        const fileName: HTMLParagraphElement = document.createElement('p');
        fileName.textContent = `${index + 1}`;
        cell.appendChild(fileName);
  
        const reader: FileReader = new FileReader();
        reader.onload = (event) => {
          const img: HTMLImageElement = document.createElement('img');
          img.src = event.target!.result as string;
          img.style.maxWidth = '100%'; // 이미지 너비를 셀 너비에 맞춤
          cell.appendChild(img);
        };
        reader.readAsDataURL(fileList[index]);
  
        row.appendChild(cell);
        index++;
      }
  
      list.appendChild(row);
    }
    if (index === 0 || fileList.length === 0) return false;
    return true;
  }

  export default PreviewFiles;