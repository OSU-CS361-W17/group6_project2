package edu.oregonstate.cs361.battleship;

/**
 * Created by dudeman on 1/31/17.
 */
public class Ship {


    //          Member Variables
    private String name;
    private int length;
    private Point start;
    private Point end;
    private int HP;


    //          Constructor
    public Ship (String name) {

        setName(name);

        // size is based on name of ship, if unrecognized ship type the function sets size to 0
        if (name.toLowerCase().contains("aircraftcarrier")) {
            setLength(5);
            setHP(5);

            if(name.toLowerCase().contains("computer")){
                start = new Point(1,1);
                end = new Point(1,5);
            }else{
                start = new Point();
                end = new Point();
            }
        }

        else if (name.toLowerCase().contains("battleship")) {
            setLength(4);
            setHP(4);

            if(name.toLowerCase().contains("computer")){
                start = new Point(5,2);
                end = new Point(5,5);
            }else{
                start = new Point();
                end = new Point();
            }
        }

        else if (name.toLowerCase().contains("submarine") || name.toLowerCase().contains("cruiser")) {
            setLength(3);
            setHP(3);

            if(name.toLowerCase().contains("computer")) {
                if (name.toLowerCase().contains("cruiser")) {
                    start = new Point(6, 3);
                    end = new Point(6, 5);
                }else{
                    start = new Point(10, 3);
                    end = new Point(10, 5);
                }
            }else{
                start = new Point();
                end = new Point();
            }
        }

        else if (name.toLowerCase().contains("destroyer")) {
            setLength(2);
            setHP(2);

            if(name.toLowerCase().contains("computer")){
                start = new Point(9,2);
                end = new Point(9,3);
            }else{
                start = new Point();
                end = new Point();
            }
        }

        else {
            setLength(0);
            setHP(0);
            start = new Point();
            end = new Point();
        }
    }


    //          Setters and Getters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;               // shouldn't need to resize an existing ship, but here it is
    }

    public Point getStart() {
        return start;
    }

    public void setStart(int x, int y) {   // Setting Start and End points reqs passing x and y coordinates
        this.start = new Point(x, y);
    }

    public Point getEnd() {
        return end;
    }

    public void setEnd(int x, int y) {
        this.end = new Point(x, y);
    }

    public int getHP() {
        return HP;
    }

    public void setHP(int HP) {
        this.HP = HP;
    }

    public void hitHP () {
        this.HP -= 1;
    }

    // RETURN ANY SHIP OBJECT DIRECTLY
    //public Ship getShip() {
        //return this;
    //}

}
