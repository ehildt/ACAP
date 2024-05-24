import os
import sys
import shutil

def clean_folders(root_dir, folder_names):
    for root, dirs, _ in os.walk(root_dir):
        for folder_name in folder_names:
            if folder_name in dirs:
                folder_path = os.path.join(root, folder_name)
                try:
                    shutil.rmtree(folder_path)
                except PermissionError:
                    print(f"Failed to delete {folder_path}: Permission denied")
                except Exception as e:
                    print(f"Failed to delete {folder_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python clean.py [<root_directory>] <folder_name1> <folder_name2> ...")
        sys.exit(1)

    if os.path.isdir(sys.argv[1]):
        root_directory = sys.argv[1]
        folder_names = sys.argv[2:]
    else:
        root_directory = os.getcwd()
        folder_names = sys.argv[1:]

    print(f"Cleaning folders: **/{', **/'.join(folder_names)} in {os.path.abspath('./')}")
    clean_folders(root_directory, folder_names)
    print("Cleaning complete.")
